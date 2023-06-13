import { signInWithPopup } from "firebase/auth";
import { checkUniqueEmailExists } from "./dataApi";
import { setCurrentUser, checkFirestoreDoc } from "../features/authSlice";
import axios from "axios";
import { baseUrl } from "../components/constants/baseUrls";

export const signInWithGoogle = async (
    auth,
    provider,
    navigate,
    dispatch,
    setLoading
) => {
    setLoading(true);
    signInWithPopup(auth, provider)
        .then(async (result) => {
            await checkFirestoreDoc(result?.user);
            await chequeUniqueEmail(
                result?.user,
                result?.providerId,
                navigate,
                dispatch
            );
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log({ err });
        });
};

const chequeUniqueEmail = async (user, provider, navigate, dispatch) => {
    const uniqueResponse = await checkUniqueEmailExists(user?.email);
    if (!uniqueResponse.status) {
        await loginUser(user?.email, user?.uid, user?.photoURL, provider, navigate, dispatch);
    }
};

const loginUser = async (email, uid, photoURL, provider, navigate, dispatch) => {
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", uid);

    const loginToDbResponse = await loginUserWithDb(formData);
    if (loginToDbResponse.success) {
        const { id, token, user_type, username, first_name, last_name, email, photo } =
        loginToDbResponse?.result;
        localStorage.setItem(
            "logged_in",
            JSON.stringify({ id, token, user_type, username, first_name, last_name, email, firebaseDocId: email, photo, provider: null })
        );
        dispatch(
            setCurrentUser({ ...loginToDbResponse?.result, firebaseDocId: uid })
        );
        navigate();
    } else {
        connectAccounts(email, uid, photoURL, provider, navigate, dispatch);
    }
};

export const loginUserWithDb = async (data) => {
    try {
        const response = await axios.post(baseUrl + "/users/api/login", data);
        return response?.data;
    } catch (error) {
        if (error?.response?.data?.message === "your account is not verified") {
            return "your account is not verified";
        }
        return false;
    }
};

export const linkAccountsWithDb = async (data) => {
    try {
        const response = await axios.post(baseUrl + "/users/api/login", data);
        if (response) {
            return response.data;
        } else {
            return false;
        }
    } catch (error) {
        console.log("error in: linkAccountsWithDb", { error });
        return false;
    }
};

const connectAccounts = async (email, uid, photoURL, provider, navigate, dispatch) => {
    let loginFormData = new FormData();
    loginFormData.append("email", email);
    loginFormData.append("provider", provider);
    loginFormData.append("u_uid", uid);
    const connectResponse = await linkAccountsWithDb(loginFormData);
    // console.log({connectResponse})
    if (connectResponse?.success) {
        const { id, token, user_type, username, first_name, last_name, email, photo } =
            connectResponse?.result;
        localStorage.setItem(
            "logged_in",
            JSON.stringify({ id, token, user_type, username, first_name, last_name, email, firebaseDocId: email, photo: photoURL, provider })
        );
        dispatch(
            setCurrentUser({ ...connectResponse?.result, photo: photoURL, firebaseDocId: uid })
        );
        navigate();
    }
};
