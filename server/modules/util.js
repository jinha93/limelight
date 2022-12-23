const utils = {
    success: (message, data, data2) => {
        return {
            success: true,
            message: message,
            data: data,
            data2: data2
        }
    }, 

    fail: (message) => {
        return {
            success: false,
            message: message
        }
    },
}

module.exports = utils;