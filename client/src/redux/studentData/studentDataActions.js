// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      console.log(store.getState().blockchain.contract);

      let res = await store
        .getState()
        .blockchain.contract.methods.getStudentInfo()
        .call();
      
        let n=await store
        .getState()
        .blockchain.contract.methods.institutecount().call();

        console.log(n)
        let res2={}

        for(var i=0;i<n;i++)
        {
          let det=await store
          .getState()
          .blockchain.contract.methods.getInstituteInfo_Students(1000+i).call();
          res2[1000+i]=det;
        }

      console.log(res);
      console.log(res2);
      dispatch(fetchDataSuccess({res,res2}));
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
