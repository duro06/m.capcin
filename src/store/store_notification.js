import { http } from "@/services/http_service";
// eslint-disable-next-line no-unused-vars
import store from ".";

const state = () => ({
  notifications: []
});
//////////////////////////
const mutations = {
  setNotifications(state, payload) {
    state.notifications = payload;
  },
  delNotifications(state) {
    state.notifications = [];
  }
};
//////////////////////////
const actions = {
  getNotifications() {
    return new Promise(resolve => {
      http()
        .get(`user/notification`)
        .then(res => {
          let existingNotif = store.state.notification;
          let notif = res.data.data;
          console.log(notif);
          store.commit("delNotification");
          let newNotif = [];
          // if (notif.length != existingNotif.length) {
          if (existingNotif.length) {
            let terbaca = existingNotif.filter(data => data.data.read == true);
            notif.forEach(data => {
              newNotif.push(data);
            });
            console.log("terbaca", terbaca);
            if (terbaca.length) {
              terbaca.forEach(data => {
                newNotif.push(data);
              });
            }
            // let dataBaru = notif.filter(data => {
            //   existingNotif.forEach(e => {
            //     // console.log("id lama", e.id, "id baru", data.id);
            //     if (data.id != e.id) {
            //       console.log("baru", data.id);
            //       console.log("lama", e.id);
            //       return true;
            //     }
            //   });
            // });
            // dataBaru.forEach(data => {
            //   newNotif.push(data);
            // });
            // console.log("dataBaru ", dataBaru);
            // let dataBaru2 = existingNotif.filter(data => {
            //   notif.forEach(e => {
            //     // console.log("id lama", e.id, "id baru", data.id);
            //     if (data.id != e.id) {
            //       console.log("baru", data.id);
            //       console.log("lama", e.id);
            //       return true;
            //     }
            //   });
            // });
            // console.log("dataBaru 2", dataBaru2);
            // dataBaru2.forEach(data => {
            //   newNotif.push(data);
            // });
          } else {
            notif.forEach(data => {
              newNotif.push(data);
            });
          }
          console.log("new ", newNotif);
          newNotif.forEach(data => {
            store.commit("setNotification", data);
          });
          // } else {
          //   let baru = existingNotif.filter(lama => {
          //     notif.forEach(baru => {
          //       if (lama.id == baru.id) {
          //         lama = baru;
          //         console.log("data change", lama.id, baru.id);
          //       } else if (lama.id != baru.id) {
          //         return true;
          //       }
          //     });
          //   });
          //   baru.forEach(e => {
          //     store.commit("setNotification", e);
          //   });
          // }
          if (res.status == 200) {
            resolve(res.data);
          }
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  readNotifications({ commit }, params) {
    let data = new FormData();
    data.append("id", params);
    return new Promise(resolve => {
      http()
        .post(`user/notification`, data)
        .then(res => {
          console.log("read ", res);
          if (res.status == 200) {
            resolve(res.data);
          }
        });
    });
  },
  readAllNotifications() {
    console.log("read All");
    return new Promise(resolve => {
      http()
        .post(`user/notification-all`)
        .then(res => {
          console.log("read all", res);
          if (res.status == 200) {
            resolve(res.data);
          }
        });
    });
  }
};
//////////////////////////

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
