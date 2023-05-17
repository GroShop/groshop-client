// import instance from 'utils/axios.utils';

// const auth = {
//   login: (data:any) => {
//     let promise = new Promise((resolve, reject) => {
//       let url = 'auth/user_login';
//       instance()
//         .post(url, data)
//         .then((res:any) => {
//           resolve(res.data);
//         })
//         .catch((error:any) => {
//           reject(error);
//         });
//     });
//     return promise;
//   },
//   signup: (data:any) => {
//     let promise = new Promise((resolve, reject) => {
//       let url = 'auth/user_signup';
//       instance()
//         .post(url, data)
//         .then((res) => {
//           resolve(res.data);
//         })
//         .catch((error) => {
//             reject(error);
//         });
//     });
//     return promise;
//   },
//   // getUser: (id) => {
//   //   let promise = new Promise((resolve, reject) => {
//   //     let url = 'user/view/' + id;
//   //     instance()
//   //       .post(url)
//   //       .then((res) => {
//   //         resolve(res.data);
//   //       })
//   //       .catch((error) => {
//   //         console.log('model error', error);
//   //         if (error.response) {
//   //           if (
//   //             error.response.data.message === 'Invalid token' ||
//   //             error.response.data.message === 'invalid signature'
//   //           ) {
//   //             localStorage.clear();
//   //             window.location.href = '/login';
//   //             reject('');
//   //           } else {
//   //             reject(error.response.data.message);
//   //           }
//   //         } else {
//   //           reject(error);
//   //         }
//   //       });
//   //   });
//   //   return promise;
//   // },
// }