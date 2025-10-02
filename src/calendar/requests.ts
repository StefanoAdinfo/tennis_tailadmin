import { CALENDAR_ITENS_MOCK, COURT_MOCK } from "~/calendar/mocks";

export const getEvents = async () => {
  // TO DO: implement this
  // Increase the delay to better see the loading state
  // await new Promise(resolve => setTimeout(resolve, 800));
  console.log("getEvents", CALENDAR_ITENS_MOCK);
  return CALENDAR_ITENS_MOCK;
};

export const get_Courts = async () => {
  // TO DO: implement this
  // Increase the delay to better see the loading state
  // await new Promise(resolve => setTimeout(resolve, 800));
  return COURT_MOCK;
};
