const utils = {
    success: (result) => {
        return {
            success: true,
            result: result
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