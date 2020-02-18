import { observable, toJS, computed, autorun, reaction } from 'mobx';
import { createProduct, editProduct, getMyProductById } from 'AppServices';
import strings from 'src/res/strings.json';
import ImgToBase64 from 'react-native-image-base64';
import { imageSelect, resizeImage } from '../../../shared/helperFunc';
import { errorUpdateDialog, successUpdateDialog, startLoadingDialog } from "../../../shared/navigation";
import { updateObject } from 'AppUtils';
import { Actions } from 'react-native-router-flux';

const imagesLenght = 5;
class ObservableCreateProduct {
  @observable showLoading = false;

  @observable showAlert = false;

  @observable type = '';

  @observable msg = '';

  @observable productMainImage = '';

  @observable productImages = Array(imagesLenght).fill('');

  @computed get newCost() {
    return (this.bodyRequest.price * (100 - this.bodyRequest.discount)) / 100;
  }

  editMode = false;

  bodyRequest = observable.object({
    id: -1,
    product_key: '',
    business_id: -1,
    category: '',
    name: '',
    brand: '',
    price: '',
    discount: '',
    description: '',
    unit: '',
    post_cost: '',
    quantity: '',
    // have_post_cost: 0,
    images: Array(imagesLenght).fill('')
  });

  @observable properties = [
    {
      key: 0,
      title: strings.productName,
      value: '',
      name: 'name'
    },
    {
      key: 1,
      title: strings.cost,
      value: '',
      unit: strings.toman,
      name: 'price',
      keyboardType: 'numeric'
    },
    {
      key: 2,
      title: strings.discount,
      value: '',
      unit: '%',
      color: 'green',
      name: 'discount',
      keyboardType: 'numeric'
    },
    {
      key: 3,
      title: strings.newCost,
      unit: strings.toman,
      color: 'red',
      name: 'newCost',
      value: '',
      notEditable: true
    },
    { key: 4, title: strings.unit, value: '', unit: '', name: 'unit' },
    {
      key: 5,
      title: strings.postCost,
      value: '',
      unit: strings.toman,
      name: 'post_cost',
      keyboardType: 'numeric'
    },
    {
      key: 6,
      title: strings.existsCount,
      value: '',
      unit: '',
      name: 'quantity',
      keyboardType: 'numeric'
    }
  ];

  setupProductValues = (pId, name) => {
    this.editMode = true;

    getMyProductById(pId)
      .then((res) => {

        const newProperties = toJS(this.properties);
        this.properties.forEach((editableProperty, index) => {
          if (editableProperty.name !== 'newCost') {
            newProperties[index].value = res[editableProperty.name];
          }
        });
        this.properties = newProperties;

        Object.keys(res).map((pKeys) => {
          if (pKeys === 'business') {
            this.bodyRequest.business_id = res[pKeys].id;
          } else if (pKeys === 'have_post_cost') {
            this.bodyRequest[pKeys] = res[pKeys] || 0;
          } else if (pKeys === 'images') {
            let images = []
            images = res[pKeys] && res[pKeys].map(img => (
              { file: img.path, old: true }
            ))
            while (images.length < imagesLenght) {
              images.push({ file: "" })
            }
            this.bodyRequest[pKeys] = images;
          } else {
            this.bodyRequest[pKeys] = res[pKeys];
          }
        });

        console.log(toJS(this.bodyRequest))
        // this.bodyRequest.description = res.description;
        // this.bodyRequest.have_post_cost = res.have_post_cost || 0;
        // console.log(this.bodyRequest);
        // console.log(this.properties);
      })
      .catch((err) => console.log(err));
  };

  setupBusinessId = (bId) => {

    this.bodyRequest.images = Array(imagesLenght).fill('');
    this.bodyRequest.price = 0;
    this.bodyRequest.discount = 0;
    this.bodyRequest.name = "";
    this.bodyRequest.description = "";
    this.bodyRequest.unit = "";
    this.bodyRequest.post_cost = "";
    this.bodyRequest.quantity = 0;

    this.bodyRequest.business_id = bId;
  };

  onSelect = async (uri, index, isMain) => {
    const imageIndex = isMain ? 0 : index + 1;

    // if (isMain) {
    //   this.productMainImage = uri;
    // } else {
    //   this.productImages[index] = uri;
    // }
    this.bodyRequest.images[imageIndex] = {};
    try {
      const resizedImage = await resizeImage(uri, 750, 750);
      const base64 = await ImgToBase64.getBase64String(resizedImage);
      const images = [...this.bodyRequest.images];
      images[imageIndex] = {
        file: `data:image/png;base64,${base64}`
      };

      this.bodyRequest.images = images;
    } catch (err) {
      errorUpdateDialog(err)

    }
    console.log(toJS(this.bodyRequest));
  };

  setBodyRequest = (text, name) => {
    this.bodyRequest[name] = text;
  };

  setDescription = (text) => {
    this.bodyRequest.description = text;
  };

  seBoxValue = () => {
    this.bodyRequest.have_post_cost = 1 - this.bodyRequest.have_post_cost;
    console.log(this.bodyRequest);
  };

  popInterval;

  onCreateProduct = (addNewProductToState, editProductToState) => {

    let bodyRequest = toJS(this.bodyRequest)

    let images = bodyRequest.images.filter(img => (img !== "" && img.file !== ""))
    // let images = bodyRequest.images.filter(img => (img !== "" && img.file !== ""))

    // if (images.length === 0) {
    //   images = [{ file: "" }]
    // }

    bodyRequest = updateObject(bodyRequest, {
      images
    })


    if (this.editMode) {
      startLoadingDialog(strings.loadingEditProduct);
      editProduct(bodyRequest)
        .then((res) => {
          console.log(res)
          editProductToState(res)
          successUpdateDialog(strings.successUpdate);
        })
        .catch((err) => {
          errorUpdateDialog(err)
          console.log(err);
        });
    } else {
      startLoadingDialog(strings.loadingCreateProduct);
      createProduct(bodyRequest)
        .then((product) => {

          addNewProductToState(product);
          Actions.refresh({ stillVisible: false })
          this.popInterval = setInterval(() => {
            if (!("" + Actions.currentScene).includes('dialogbox')) {
              clearInterval(this.popInterval)
              Actions.pop();
            }
          }, 50)
          // successUpdateDialog(strings.successUpdate)
        })
        .catch((err) => {
          errorUpdateDialog(err)
        });
    }
  };
}

const ObservableCreateProductStore = new ObservableCreateProduct();

export default ObservableCreateProductStore;
