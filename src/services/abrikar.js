import httpClient from './restService';
import { parseErrors } from './helper';

export const getAbrikarLaw = () => {
    return httpClient('/abrikaarBlogPages/law')
        .then(({data}) => {

            return data ;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarContact = () => {
    return httpClient('/abrikaarBlogPages/contact')
        .then(({data}) => {

            return data ;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarAbout = () => {
    return httpClient('/abrikaarBlogPages/about')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarGuide = () => {
    return httpClient('/abrikaarBlogPages/guide')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarShare = () => {
    return httpClient('/abrikaarBlogPages/share')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarAdv = () => {
    return httpClient('/abrikaarBlogPages/adv')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarOpportunuty = () => {
    return httpClient('/abrikaarBlogPages/opportunity')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};

export const getAbrikarFAQ = () => {
    return httpClient('/abrikaarBlogPages/faq')
        .then(({data}) => {
            return data.data;
        })
        .catch((err) => {
            throw parseErrors(err);
        });
};