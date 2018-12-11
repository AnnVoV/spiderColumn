function getConstant() {
  return 1;
}

async function getAsyncConstant() {
  return 1;
}

async function getPromise() {
  return new Promise((resolved, rejected) => {
    resolved(1);
  });
}

async function test() {
  var a = 2;
  var c = 1;
  await getConstant();
  var d = 3;
  await getPromise();
  var d = 4;
  await getAsyncConstant();
  return 2;
}
