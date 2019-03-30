'use strict';
const puppeteer = require('puppeteer');
var request = require('request');
const fs = require('fs');
const os = require('os');
const moment = require('moment');
require('dotenv').config();

const tmpImgName = 'tmpimage.png';

module.exports = async (req, res) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://coin360.com/');

    await page.waitFor('.MapBox');
    const tenkizu = await page.$('.MapBox');
    await tenkizu.screenshot({path: os.tmpdir() + '/' + tmpImgName});
    await browser.close();
    sendDiscord();
    res.send('finished');
};

function sendDiscord(){
    const webhookUrl = process.env.WEBHOOKURL;

    var embedOptions = {
        "username": "Coin360",
        "avatar_url": "https://coin360.com/favicon.ico",
        "content": "Coin HeatMap" + `${moment().format('YYYY-MM-DD')}`,
        "embeds": [
            {
                "title": "CoinHeatMap",
                "url": "https://coin360.com/",
                "fields": [
                    {
                        "name": ":thumbsup:いいね",
                        "value": "6353",
                        "inline":true
                    },

                ]
            }
        ]
    };
    // var options = {
    //     uri: webhookUrl,
    //     headers: {
    //         "Content-type": "multipart/form-data"
    //     },
    //     json: embedOptions
    // };
    // console.log(options);
    // 画像を投稿するときはmultipartで送る必要がある
    const formData = {
        attachments: [
            fs.createReadStream(os.tmpdir() + '/' + tmpImgName)
        ],
        payload_json: JSON.stringify(embedOptions)

    };
    console.log(formData);
    var response = request.post({url: webhookUrl, formData: formData}, (err, response, body) => {
        if (err) {
            console.error('upload failed');
        }
        console.log('upload success');
    });
}
