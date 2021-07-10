import { combineReducers } from 'redux';
import { overlaySlice } from './modules/overlay/src/overlayReducer';
import { statusSlice } from './modules/status/src/statusReducer';
import { authSlice } from './modules/auth/src/authReducer';
import { productSlice } from './modules/products/src/productReducers';

export default combineReducers({
  auth: authSlice.reducer,
  status: statusSlice.reducer,
  overlay: overlaySlice.reducer,
  product: productSlice.reducer,
});
