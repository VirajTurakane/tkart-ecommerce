import { v4 as uuid } from "uuid";

export default function generateUniqueId(length) {
  return uuid().toUpperCase().slice(0, length);
}
