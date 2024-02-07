const initialStore = {
    menu: {
        is_open: false,
        active_page: '',
    },
    calendar: {
        mainCalendar: {
            fromDate: {date: null, requestDate: null},
            toDate: {date: null, requestDate: null},
            is_open: false,
        },
        detailsCalendar: {
            fromDate: {date: null, requestDate: null},
            toDate: {date: null, requestDate: null},
            is_open: false,
        }
    },
    popup: {
        is_open: false,
        message: '',
        is_error: false
    },
    user: {
        isAuth: false,
        team: '',
        role: '',
        is_loading: true,
    },
    loader: {
        is_loading: false,
    }
}

export default initialStore;