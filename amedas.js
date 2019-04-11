'use strict';
const puppeteer = require('puppeteer');
var request = require('request');
const fs = require('fs');
const os = require('os');
const moment = require('moment');
require('dotenv').config();
const { performance, PerformanceObserver } = require('perf_hooks');
const tmpImgName = 'tmpimage.png';

module.exports = async (req, res) => {
    console.log('performance called1 : ' + performance.now());
    const browser = await puppeteer.launch({
        args: ['--no-sandbox',
               '--disable-setuid-sandbox',
               '-–disable-dev-shm-usage',
               '--disable-gpu',
               '--no-first-run',
               '--no-zygote',
               '--single-process',
              ]
    });
    const page = await browser.newPage();
    console.log('performance2 called : ' + performance.now());
    await page.goto('https://coin360.com/', {waitUntil: 'load', timeout: 40000});
    console.log('performance3 called : ' + performance.now());

    await page.waitForSelector('.MapBox');
    const tenkizu = await page.$('.MapBox');
    await tenkizu.screenshot({path: os.tmpdir() + '/' + tmpImgName});
    await browser.close();
    console.log('performance4 called : ' + performance.now());
    sendDiscord();
    console.log('performance5 called : ' + performance.now());
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
