"use client";

const getCurrentDate = () => {
  return new Date().toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const currentDate = getCurrentDate();

export default currentDate;
