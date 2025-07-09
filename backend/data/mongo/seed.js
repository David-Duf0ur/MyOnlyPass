db = db.getSiblingDB('credentials');

db.credentials.insertOne({ 
  _id: ObjectId("685d50ce803fd094fd69e328"),
  vaultId: 1,
  title: "Twitter",
  category: "Social Media",
  userId: 1,
  passwordEncrypted: "1234",
  mail: "adavid@gmail.com",
  url: "https://twitter.com",
  favorite: true,
  iconify: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 14 14"><path fill="currentColor" d="M7 0c3.87 0 7 3.13 7 7s-3.13 7-7 7s-7-3.13-7-7s3.13-7 7-7M5.72 10.69c3.1 0 4.8-2.57 4.8-4.8v-.22c.33-.24.62-.54.84-.88c-.3.13-.63.22-.97.27c.35-.21.62-.54.74-.93c-.33.19-.69.33-1.07.41c-.31-.33-.75-.53-1.23-.53c-.93 0-1.69.76-1.69 1.69c0 .13.01.26.05.38c-1.4-.07-2.65-.74-3.48-1.76c-.14.25-.23.54-.23.85c0 .58.3 1.1.75 1.4c-.28 0-.54-.08-.76-.21v.02c0 .82.58 1.5 1.35 1.66c-.14.04-.29.06-.44.06c-.11 0-.21-.01-.32-.03c.21.67.84 1.16 1.57 1.17c-.58.45-1.31.72-2.1.72c-.14 0-.27 0-.4-.02c.74.48 1.63.76 2.58.76" class="cls-1"/></svg>`,
  created_at: new Date(),
  updated_at: new Date()
});

db.credentials.insertOne({ 
  _id: ObjectId("685d50ce803fd094fd69e329"), 
  vaultId: 1,
  title: "Facebook",
  category: "Social Media",
  userId: 1,
  passwordEncrypted: "4321",
  mail: "bdavid@gmail.com",
  url: "https://facebook.com",
  favorite: false,
  iconify: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024"><path fill="currentColor" d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32m-92.4 233.5h-63.9c-50.1 0-59.8 23.8-59.8 58.8v77.1h119.6l-15.6 120.7h-104V912H539.2V602.2H434.9V481.4h104.3v-89c0-103.3 63.1-159.6 155.3-159.6c44.2 0 82.1 3.3 93.2 4.8v107.9z"/></svg>`,
  created_at: new Date(),
  updated_at: new Date()
});

db.credentials.insertOne({ 
  _id: ObjectId("685e99bc7d57e71bf369e328"), 
  vaultId: 1,
  title: "Apple", 
  category: "Social Media",
  userId: 1,
  passwordEncrypted: "ERROR",
  mail: "cdavid@gmail.com",
  url: "https://apple.com",
  favorite: false,
  iconify: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 256 256"><g fill="none"><g clip-path="url(#skillIconsAppleLight0)"><path fill="#f4f2ed" d="M196 0H60C26.863 0 0 26.863 0 60v136c0 33.137 26.863 60 60 60h136c33.137 0 60-26.863 60-60V60c0-33.137-26.863-60-60-60"/><path fill="#00a0e2" fill-rule="evenodd" d="M191.072 195.009c-3.27 5.387-6.54 9.426-10.484 13.176c-4.424 3.944-5.674 7.406-15.87 8.754c-7.213 1.347-13.465-1.348-15.87-2.405c-7.214-3.367-10.966-4.424-15.293-4.424c-4.232 0-7.791 1.058-14.909 4.328c-2.212 1.153-8.175 3.751-15.485 2.405c-7.502-1.347-11.35-4.232-14.139-6.637c-5.771-5.097-10.1-9.907-14.043-15.485z" clip-rule="evenodd"/><path fill="#34be2d" fill-rule="evenodd" d="M58.726 105.27c3.366-7.598 7.79-12.696 12.215-16.255c11.253-9.233 29.624-9.81 38.088-7.598c6.926 1.731 11.831 5.963 19.622 5.963c8.175 0 12.887-4.136 19.333-5.963c8.464-2.116 26.931-1.443 38.954 7.79c3.559 2.694 6.827 6.349 8.655 8.369c-4.327 3.174-6.925 5.482-9.041 7.694z" clip-rule="evenodd"/><path fill="#ffb400" fill-rule="evenodd" d="M186.553 105.27c-2.02 2.212-3.462 4.329-5.098 7.31c-1.922 3.463-4.232 8.176-4.809 15.293H53.051c.096-1.154.192-2.404.384-3.655c1.155-7.598 2.982-13.85 5.29-18.948z" clip-rule="evenodd"/><path fill="#ff7a00" fill-rule="evenodd" d="M176.646 127.873a74 74 0 0 0 0 6.541c.289 5.29 2.116 11.157 4.521 15.87l-125.712-.289c-1.731-7.598-2.693-15.389-2.404-22.122z" clip-rule="evenodd"/><path fill="#f41e34" fill-rule="evenodd" d="M181.166 150.284a33 33 0 0 0 3.558 5.771c8.272 10.58 11.831 10.58 18.275 13.851c-.479 1.152-.864 2.212-1.346 3.174l-138.888-.289c-2.693-5.867-5.482-14.139-7.31-22.795z" clip-rule="evenodd"/><path fill="#a2359c" fill-rule="evenodd" d="M201.653 173.08c-4.039 9.426-7.31 16.349-10.581 21.929l-116.091-.288c-3.848-5.675-7.31-11.928-11.254-19.719c-.288-.673-.673-1.443-.962-2.211z" clip-rule="evenodd"/><path fill="#34be2d" fill-rule="evenodd" d="M161.352 52.658c-.674 4.81-3.078 10.965-6.925 14.908c-4.138 4.425-10.581 9.234-14.429 11.639c-2.116 1.346-7.599 1.538-12.118 2.02c-.577-4.04-.673-7.503.577-11.254c1.635-4.424 3.753-10.772 7.118-15.197c4.135-5.482 8.848-9.233 11.445-10.58c3.464-1.731 9.235-4.328 14.236-5.194c.193 4.424.867 9.426.096 13.658" clip-rule="evenodd"/></g><defs><clipPath id="skillIconsAppleLight0"><path fill="#fff" d="M0 0h256v256H0z"/></clipPath></defs></g></svg>`,
  created_at: new Date(),
  updated_at: new Date()
});

db.credentials.insertOne({
  _id: ObjectId("685e99bc7d57e71bf369e329"),
  vaultId: 1,
  title: "BNP Paribas",
  category: "Banking",
  userId: 1,
  passwordEncrypted: "34RTY",
  mail: "ddavid@gmail.com",
  url: "https://bnp.com",
  favorite: false,
  iconify: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M21.5 9v10M5.5 9v10m-3-10v10m16-10v10M2 21h20M0 23.5h24M12 11h-1a1 1 0 0 0-1 1v.375a1 1 0 0 0 .72.96l2.56.747a1 1 0 0 1 .72.96V16a1 1 0 0 1-1 1h-1m0-6h1a1 1 0 0 1 1 1v.5M12 11V9m0 8h-1a1 1 0 0 1-1-1v-.5m2 1.5v2M23.5 6.25V7H.5v-.75C5.5 4.5 8.5 3 11.75.5h.5C15.5 3 18.5 4.5 23.5 6.25Z" strokeWidth="1"/></svg>`,
  created_at: new Date(),
  updated_at: new Date()
});

db = db.getSiblingDB('fields');

db.fields.insertOne({
  userId: 1,
  credentialId: "685d50ce803fd094fd69e328",
  fieldConfig: [{
    name: "Account number",
    value: "fbx12345",
    required: false    
  },{
    name: "Pseudo",
    value: "Toto",
    required: false    
  }],
  created_at: new Date(),
  updated_at: new Date()
});

db.fields.insertOne({
  userId: 1,
  credentialId: "685d50ce803fd094fd69e329",
  fieldConfig: [{
    name: "Account number",
    value: "fbx12345",
    required: false    
  }],
  created_at: new Date(),
  updated_at: new Date()
});

db.fields.insertOne({
  userId: 1,
  credentialId: "685e99bc7d57e71bf369e328",
  fieldConfig: [],
  created_at: new Date(),
  updated_at: new Date()
});

db.fields.insertOne({
  userId: 1,
  credentialId: "685e99bc7d57e71bf369e329",
  fieldConfig: [],
  created_at: new Date(),
  updated_at: new Date()
});