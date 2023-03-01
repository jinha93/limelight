const database = require('../config/firebase');

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

point.getAll = () => {
    return new Promise((resolve, reject) => {
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
    
            resolve(resultData)
        } catch (error) {
            reject(error)
        }
    })
}

point.get = async (userId) => {
    return new Promise((resolve, reject) => {
        try {
            const ref = database.ref(`ID/${userId}`);
            
            let data = {};
            ref.on('value', (snapshot) =>{
                data = snapshot.val();
            })

            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

point.update = (userId, point) => {
    return new Promise((resolve, reject) => {
        const ref = database.ref(`ID/${userId}`);

        ref.update({'총 획득 포인트': point}, (error) => {
            if(error){
                reject(error)
            }else{
                resolve()
            }
        })
    })
}

module.exports = point;