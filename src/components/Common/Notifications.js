import { Store } from 'react-notifications-component';


const successNotification = (title, message) => {
    return Store.addNotification({
        title: title,
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        },


    });
}
const errorNotification = (title, message) => {
    return Store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true
        },


    });
}

export { successNotification, errorNotification }

