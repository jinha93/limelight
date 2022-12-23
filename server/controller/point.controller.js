const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const database2 = require('../config/firebase');
const { ref, onValue, query, orderByChild, startAfter, update } = require('firebase/database');


const database = require('../config/firebase-admin');

const point = {};

function arrOrderDesc(key) {
    return function (a, b) {
        if (a[key] * 1 < b[key] * 1) {
            return 1;
        } else if (a[key] * 1 > b[key] * 1) {
            return -1;
        }
        return 0;
    }
}

point.getAll = async function (req, res, next) {
    try {
        const ref = database.ref(`ID`);
        
        let data = [];
        ref.on('value', (snapshot) =>{
            let json = snapshot.val();
            for (var key in json) {
                data.push(json[key]);
            }
        })

        data.sort(arrOrderDesc("총 획득 포인트"));

        let resultData = [];
        for (let i = 0; i < data.length; i++) {
            const json = data[i];
            if (json != undefined) {
                json.rank = i + 1;
            }
            resultData.push(json);
        }

        return res.status(CODE.OK).send(resultData);
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

point.get = async function (req, res, next) {
    try {
        const {userId} = req.params;

        const ref = database.ref(`ID/${userId}`);
        
        let data = {};
        ref.on('value', (snapshot) =>{
            data = snapshot.val();
        })
        
        return res.status(CODE.OK).send(data);
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

point.update = async function (req, res, next) {
    try {
        const {userId, paramPoint} = req.params;

        // const ref = database.ref(`ID/${userId}`);
        const ref = database.ref(`ID/426300755553812480`);
        
        let data = {};
        ref.on('value', (snapshot) =>{
            data = snapshot.val();
        })

        console.log(data);

        if(data){
            changePoint = parseInt(data['총 획득 포인트']) + parseInt(paramPoint);
            if(changePoint >= 0){
                ref.update({'총 획득 포인트': changePoint})
            }else{
                return res.status(CODE.NOT_MODIFIED).send(UTIL.fail('0보다작음'));
            }
        }else{
            return res.status(CODE.NOT_MODIFIED).send(UTIL.fail(MSG.DATA_UPDATE_FAIL));
        }

        return res.status(CODE.OK).send(data);
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    } 
}


module.exports = point;