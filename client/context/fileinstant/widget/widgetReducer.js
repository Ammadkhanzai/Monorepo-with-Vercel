// eslint-disable-next-line
const index = (state, action) => {
  return {
    ...state,
    [action.field]: action.value,
  };
};

export default index
