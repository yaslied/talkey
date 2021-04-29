const path_view = "./admin";

const postDefault = {
  url: '',
  name: 'default',
  imgUrl: null,
  order: 0,
  active: true,
  txt: '',
  abstract: '',
  notFound: false,
};



const pageDefault = {
  url: '',
  name: '',
  imgUrl: null,
  order: 0,
  active: true,
  txt: '',
  abstract: '',
  notFound: false,
};


exports.blog = async function (req, res) {
  // const {id = 0} = req.params || {};
  // if(!id) {
  //   return res.status(500).send('Id not found!');
  // }

  const local = {
    id: 0,
    post: null
  };

  // Buscar dados do post no banco
  local.post = {...postDefault};

  if(!local.post) {
    local.post = {...postDefault, notFound: true};
  }
  return res.render(path_view + '/blog', local);
};


exports.page = async function (req, res) {
  // const {id = 0} = req.params || {};
  // if(!id) {
  //   return res.status(500).send('Id not found!');
  // }

  const local = {
    id: 0,
    page: null
  };

  // Buscar dados da pagina no banco
  local.page = {...pageDefault};


  if(!local.page) {
    local.page = {...pageDefault, notFound: true};
  }
  return res.render(path_view + '/page', local);
};
