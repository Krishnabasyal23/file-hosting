import {postJSON} from "../api.js";
async function registerUser(){
    const username=username.value;
    const email=email.value;
    const password=password.value;

    const res=await postJSON("/register",{username,email,passowrd});
    MessageChannel.innerTExt=res.message;
}