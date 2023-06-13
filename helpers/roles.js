'use strict'

const AccessControl = require('accesscontrol')
const ac = new AccessControl()

const roles = () => {
    ac.grant('Admin')

        .readOwn('user')
        .updateOwn('user')

        .createAny('transactions')
        .readOwn('transactions')
        .updateOwn('transactions')

        .createAny('client')
        .readAny('client')
        .updateAny('client')

        .readAny('product')

        .readAny('program')

        .readAny('category')

    ac.grant('Super Admin')
        .extend('Admin')

        .createAny('user')
        .readAny('user')
        .updateAny('user')
        .deleteAny('user')

        .deleteAny('client')

        .createAny('product')
        .updateAny('product')
        .deleteAny('product')

        .createAny('program')
        .updateAny('program')
        .deleteAny('program')

        .createAny('category')
        .updateAny('category')
        .deleteAny('category')

        .readAny('orders')
        .updateAny('orders')
        .deleteAny('orders')

    return ac
}

module.exports = { roles }