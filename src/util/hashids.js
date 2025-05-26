import Hashids from "hashids";
const SECRET_KEY =
  import.meta.env.REACT_APP_HASHIDS_SECRET || "default-secret-key";
const MIN_LENGTH = 8;

const hashids = new Hashids(SECRET_KEY, MIN_LENGTH);

export default hashids;
