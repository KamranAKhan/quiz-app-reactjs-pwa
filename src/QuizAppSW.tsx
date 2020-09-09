export const QuizAppSW = () => {
    let swDev = `${process.env.PUBLIC_URL}/sw.js`;
    if("serviceWorker" in navigator){        
        navigator.serviceWorker.register(swDev).then((data) => {
            console.log('navigator', data);
        }).catch((err) => console.log(err));
    }
}