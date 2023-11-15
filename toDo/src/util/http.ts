//Function to make http request using XHTMLRequest

export function httpGet(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.responseText);
                } else {
                    reject(request.statusText);
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    });
}
