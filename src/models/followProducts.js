import PropTypes from "prop-types";

export const productDefault = {
    business_key: "",
    id: -1,
    mobile: "",
    owner: "",
    phone: "",
    title: ""
}

export const productProptypes = {
    business_key: PropTypes.string,
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    mobile: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    owner: PropTypes.string,
    phone: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string
}