export const successResponseHandler = (res, { status = 200, message = "Data sent successfully", payload = {} }) => {
    res.status(status).json({
        success: true,
        message,
        payload,
    });
};


export const errorResponseHandler = (res, { status = 500, message = "Internal Server Error!!!" }) => {
    res.status(status).json({
        success: false,
        message,
    });
}; 
