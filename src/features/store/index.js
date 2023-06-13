import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from "redux-persist/lib/storage/session";
import propertySlice from "./property/propertySlice";
import countrySlice from "../countrySlice";
import languageSlice from "../languageSlice";
import agentSlice from "../agentSlice";
import agencySlice from "../agencySlice";
import authSlice from "../authSlice";
import formSlice from "../formSlice";
import blogSlice from "../blogSlice";
import courseSlice from "../newCourseSlice";
import verificationRequestsSlice from "./verificationRequestsSlice";
import socialSlice from "../socialSlice";
import forumSlice from "../forumSlice";
import auctionSlice from "../auctionSlice";
import chatSlice from "../chatSlice";
import newsSlice from "../newsSlice";
import companySlice from "../companySlice";
import usersSlice from "../usersSlice";
import projectSlice from "../projectSlice";
import ticketSlice from "../ticketSlice";
import listingsSlice from "../listingsSlice";
import createPropertySlice from "../createPropertySlice";
import verificationSlice from "../verificationSlice";
import postsSlice from "../postsSlice";
import globalSlice from "../globalSlice";

const authPersistConfig = {
  key: 'auth',
  storage: storageSession,
  whitelist: ['currentUser', 'selectedTab'],
}

const globalPersistConfig = {
  key: 'global',
  storage: storageSession,
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    properties: propertySlice,
    auth: persistReducer(authPersistConfig, authSlice),
    country: countrySlice,
    language: languageSlice,
    agent: agentSlice,
    agency: agencySlice,
    stepper: formSlice,
    blog: blogSlice,
    course: courseSlice,
    requests: verificationRequestsSlice,
    social: socialSlice,
    forums: forumSlice,
    auctions: auctionSlice,
    chat: chatSlice,
    news: newsSlice,
    company: companySlice,
    project: projectSlice,
    users: usersSlice,
    tickets: ticketSlice,
    createProperty: createPropertySlice,
    listings: listingsSlice,
    verifications: verificationSlice,
    posts: postsSlice,
    global:  persistReducer(globalPersistConfig, globalSlice),
  },
});

export const persistor = persistStore(store)