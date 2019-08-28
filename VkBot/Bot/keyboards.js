module.exports = {
    start: {
        one_time: false,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        label: 'Заказать',
                        payload: {command: '/order'},
                    },
                    color: 'primary',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Связаться с администратором!',
                        payload: {command: '/report'},
                    },
                    color: 'primary',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Помощь',
                        payload: {command: '/help'},
                    },
                    color: 'secondary',
                },
            ]
        ],
    },
    order: {
        one_time: false,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        label: 'Отменить заказ!',
                        payload: {command: '/cancel'},
                    },
                    color: 'negative',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Связаться с администратором!',
                        payload: {command: '/report'},
                    },
                    color: 'primary',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Помощь',
                        payload: {command: '/help'},
                    },
                    color: 'secondary',
                },
            ]
        ],
    },
    setPrice: {
        one_time: false,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        label: 'Подтвердить заказ!',
                        payload: {command: '/confirm'},
                    },
                    color: 'positive',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Отменить заказ!',
                        payload: {command: '/cancel'},
                    },
                    color: 'negative',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Связаться с администратором!',
                        payload: {command: '/report'},
                    },
                    color: 'primary',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Помощь',
                        payload: {command: '/help'},
                    },
                    color: 'secondary',
                },
            ]
        ],
    },
    confirm: {
        one_time: false,
        buttons: [
            [
                {
                    action: {
                        type: 'text',
                        label: 'Связаться с администратором!',
                        payload: {command: '/report'},
                    },
                    color: 'primary',
                },
            ],
            [
                {
                    action: {
                        type: 'text',
                        label: 'Помощь',
                        payload: {command: '/help'},
                    },
                    color: 'secondary',
                },
            ]
        ],
    },
};