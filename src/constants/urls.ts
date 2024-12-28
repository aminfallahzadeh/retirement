export const BASE_URL = import.meta.env.VITE_BASE_URL;
// export const BASE_URL = "/retirement/";
// export const BASE_API_URL = "https://185.129.238.13/api";
// export const USERS_URL_HTTPS = "https://185.129.238.13/api/User";

// CONSTS
const CARTABLE = "cartable";
const RETIRED = "retired";
const RELATED = "related";
const PERSONNEL = "personnel";
export const STATEMENTS = "statements";
const STATEMENT = "statement";
const ELECTRONIC = "electronic";
const PERSONNEL_STATEMENTS = PERSONNEL + "-" + STATEMENTS;
const REQUEST = "request";
const CREATE = "create";
const CREATE_REQUEST = CREATE + "-" + REQUEST;
const FRACTION = "fraction";
const CALCULATE = "calculate";
const BASE_INFO = "base-info";
const ANNOUNCE = "announce";
const INSERT = "insert";
const INSERT_ANNOUNCE = INSERT + "-" + ANNOUNCE;
const HEIR = "heir";
const DOCUMENT = "document";
const GENERATE = "generate";
export const SLIPS = "slips";
const GENERATE_STATEMENT = GENERATE + "-" + STATEMENT;
const ELECTRONIC_STATEMENT = ELECTRONIC + "-" + STATEMENT;
export const REQUESTS = "requests";
export const ATTACHMENTS = "attachments";
export const HISTORY = "history";
export const TARIFF = "tariff";

export const RELATED_URL = BASE_URL + RETIRED + "/" + RELATED;
export const RETIRED_URL = BASE_URL + RETIRED;
export const RETIRED_STATEMENTS_TAB_URL = STATEMENTS;
export const RETIRED_SLIPS_TAB_URL = SLIPS;
export const RETIRED_REQUESTS_TAB_URL = REQUESTS;
export const CARTABLE_URL = BASE_URL + CARTABLE;
export const PERSONNEL_STATEMENTS_URL = BASE_URL + PERSONNEL_STATEMENTS;

// PERSONNEL
export const PERSONNEL_URL = RETIRED_URL + "/" + PERSONNEL;
export const PERSONNEL_TARIFF_TAB_URL = TARIFF;
export const PERSONNEL_RETIRED_STATEMENTS_TAB_URL = RETIRED + "-" + STATEMENTS;

export const ELECTRONIC_STATEMENT_URL = BASE_URL + ELECTRONIC_STATEMENT;
export const CREATE_REQUEST_URL = BASE_URL + CREATE_REQUEST;
export const FRACTION_URL = BASE_URL + FRACTION;
export const FRACTION_CALCULATE_URL = CALCULATE + "/" + ":step";
export const BASE_INF_2_URL = BASE_URL + BASE_INFO + "2";
export const ANNOUNCE_URL = BASE_URL + INSERT_ANNOUNCE;
export const HEIR_URL = BASE_URL + RETIRED + "/" + HEIR;
export const DOCUMENT_URL = BASE_URL + DOCUMENT + "/" + ":type";
export const GENERATE_STATEMENT_URL = BASE_URL + GENERATE_STATEMENT;
export const REQUEST_URL = BASE_URL + REQUEST;
export const REQUEST_ATTACHMENTS_URl = ATTACHMENTS;
export const REQUEST_HISTORY_URL = HISTORY;
