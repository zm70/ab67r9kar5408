// import { observable } from "mobx";
// import { suggestBusinesses } from 'AppServices';
// import { productDefault } from '../../../models/followProducts';

// class ObservableSingleBusiness {

//     @observable listSuggestBusiness = [productDefault]


//     @observable suggestLoading = false

//     fetchSuggestBusinesses(bId) {
//         suggestBusinesses(bId)
//             .then(listSuggestBusiness => {
//                 console.log(listSuggestBusiness)
//                 this.suggestLoading = false
//                 if (listSuggestBusiness)
//                     this.listSuggestBusiness = listSuggestBusiness
//             })
//             .catch(err => {
//                 this.suggestLoading = false
//                 console.log(err)
//             })
//     }
// }

// const ObservableSingleBusinessStore = new ObservableSingleBusiness();

// export default ObservableSingleBusinessStore;
