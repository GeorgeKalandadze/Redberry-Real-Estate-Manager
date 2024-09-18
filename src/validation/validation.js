export const ValidateListing = (values) => {
  const response = {
    address: "",
    image: {
      size: "",
      type: "",
    },
    region_id: "",
    city_id: "",
    zip_code: "",
    price: "",
    area: "",
    bedrooms: "",
    description: "",
    is_rental: "",
    agent_id: "",
  };

  const REGEX_ZIP = /^[0-9]+$/;
  const REGEX_NUMERIC = /^[0-9]+(\.[0-9]+)?$/;
  const REGEX_INTEGER = /^[0-9]+$/;
  const REGEX_IMAGE = /\.(jpeg|jpg|png)$/i;

  if (!values?.address || values?.address.trim().length < 2) {
    response.address = "invalid";
  } else {
    response.address = "valid";
  }

  if (!values?.image || !values?.image.file) {
    response.image.size = "invalid";
    response.image.type = "invalid";
  } else {
    const imageSizeInMB = values.image.file.size / 1024 / 1024;
    const imageType = values.image.file.name.match(REGEX_IMAGE);

    if (imageSizeInMB > 1) {
      response.image.size = "invalid";
    } else {
      response.image.size = "valid";
    }

    if (!imageType) {
      response.image.type = "invalid";
    } else {
      response.image.type = "valid";
    }
  }

  if (!values?.region_id) {
    response.region_id = "invalid";
  } else {
    response.region_id = "valid";
  }

  if (!values?.city_id) {
    response.city_id = "invalid";
  } else {
    response.city_id = "valid";
  }

  if (!values?.zip_code || !REGEX_ZIP.test(values.zip_code)) {
    response.zip_code = "invalid";
  } else {
    response.zip_code = "valid";
  }

  if (!values?.price || !REGEX_NUMERIC.test(values.price)) {
    response.price = "invalid";
  } else {
    response.price = "valid";
  }

  if (!values?.area || !REGEX_NUMERIC.test(values.area)) {
    response.area = "invalid";
  } else {
    response.area = "valid";
  }

  if (!values?.bedrooms || !REGEX_INTEGER.test(values.bedrooms)) {
    response.bedrooms = "invalid";
  } else {
    response.bedrooms = "valid";
  }

  const words = values?.description?.trim().split(/\s+/).filter(Boolean) || [];
  if (!values?.description || words.length < 5) {
    response.description = "invalid";
  } else {
    response.description = "valid";
  }

  if (values?.is_rental == "") {
    response.is_rental = "invalid";
  } else {
    response.is_rental = "valid";
  }

  if (!values?.agent_id) {
    response.agent_id = "invalid";
  } else {
    response.agent_id = "valid";
  }

  return response;
};


export const ValidateAgent = (values) => {
  const response = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: {
      size: "",
      type: "",
    },
  };

  const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@redberry\.ge$/;
  const REGEX_PHONE = /^5[0-9]{8}$/;
  const REGEX_IMAGE = /\.(jpeg|jpg|png)$/i;

  // Validate first name
  if (!values?.firstName || values?.firstName.trim().length < 2) {
    response.firstName = "invalid";
  } else {
    response.firstName = "valid";
  }

  // Validate last name
  if (!values?.lastName || values?.lastName.trim().length < 2) {
    response.lastName = "invalid";
  } else {
    response.lastName = "valid";
  }

  // Validate email
  if (!values?.email || !REGEX_EMAIL.test(values.email)) {
    response.email = "invalid";
  } else {
    response.email = "valid";
  }

  // Validate phone number
  if (!values?.phoneNumber || !REGEX_PHONE.test(values.phoneNumber)) {
    response.phoneNumber = "invalid";
  } else {
    response.phoneNumber = "valid";
  }

  // Validate avatar (image)
  if (!values?.avatar || !values?.avatar?.file) {
    response.avatar.size = "invalid";
    response.avatar.type = "invalid";
  } else {
    const imageSizeInMB = values.avatar.file.size / 1024 / 1024;
    const imageType = values.avatar.file.name.match(REGEX_IMAGE);

    if (imageSizeInMB > 1) {
      response.avatar.size = "invalid";
    } else {
      response.avatar.size = "valid";
    }

    if (!imageType) {
      response.avatar.type = "invalid";
    } else {
      response.avatar.type = "valid";
    }
  }

  return response;
};


