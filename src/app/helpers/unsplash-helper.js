import Unsplash from "unsplash-js";

//Этот класс помогает работать с unsplash, сюда выносим все методы работы с API unsplash, а на ружу даем только контекст

let bearer = localStorage.getItem("unsplash-bearer");

let unsplashContext;
if (bearer) {
    unsplashContext = new Unsplash({
        accessKey: "xDcSmGT0v_HAXnS5mf5_vEBAPtbunlu58Z9oXFQTXK4",
        secret: "ETVpJ2Rf0--y4uqSW1AG34gRGDjm-IEwCllJuFJkfxQ",
        callbackUrl: "urn:ietf:wg:oauth:2.0:oob",
        bearerToken: bearer
    });
} else {
    alert("!!!");
    unsplashContext = new Unsplash({
        accessKey: "xDcSmGT0v_HAXnS5mf5_vEBAPtbunlu58Z9oXFQTXK4",
        secret: "ETVpJ2Rf0--y4uqSW1AG34gRGDjm-IEwCllJuFJkfxQ",
        callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
    });

    const authenticationUrl = unsplashContext.auth.getAuthenticationUrl([
        "public",
        "write_likes"
    ]);

    let code = window.location.search.split('code=')[1]; //"OHNw-53oufOy_Y_AWFJF8x8JHtqMQeHTE3kZuAHYSD8"
    if (!code) {
        window.location.assign(authenticationUrl);
    } else {
        unsplashContext.auth.userAuthentication(code)
            .then(res => res.json())
            .then(json => {
                localStorage.setItem("unsplash-bearer", json.access_token);
                unsplashContext.auth.setBearerToken(json.access_token);
            });
    }
}

export default unsplashContext;