import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 500, // virtual users
  duration: "30s", // total test duration
};

export default function () {
  http.get("http://64.226.97.65:5000/api/metrics");
  sleep(1); // wait 1 second between requests
}
