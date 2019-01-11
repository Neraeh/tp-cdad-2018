/**
 * CowsayController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var cowsay = require('cowsay');

const options =
  { // This is the usual stuff
    adapter: require('skipper-better-s3'),
    key: 'AKIAJOCSBD4KTGNIE2YQ',
    secret: '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',
    bucket: 'lp-cdad-2018',
    region: 'eu-west-3',
    s3params: {
      ACL: 'public-read'
    },
    onProgress: progress => sails.log.verbose('Upload progress:', progress)
  };

const adapter = require('skipper-better-s3')(options);

module.exports = {
  /**
   * `CowsayController.say()`
   */
  say: async function (req, res) {
    let count = await Sentences.count();
    console.debug('Got '+count+' sentences in database');
    let s = await Sentences.find().limit(1).
      skip(Math.floor(Math.random() * Math.floor(count)));
    let sentence = "Random Message";
    if(s.length > 0) {
      sentence = s[0].sentence;
    }

    count = await Avatar.count();
    console.debug('Got ' + count + ' avatars in database');
    let a = await Avatar.find().limit(1);
    let url = 'OUI';

    if (a.length > 0) {
      a = a[0];

      if (a !== undefined && a !== null) {
        url = adapter.url('getObject', {s3params: {Key: a.avatar}});
      }
    }

    return res.view('cowsay', {
      cow: cowsay.say({
        f: process.env.COW || 'stegosaurus',
        text : sentence,
        e : 'oO',
        T : 'U '
      }),
      avatarUrl: url
    });
  },

  add: async function (req, res) {
    return res.view('add');
  },

  create: async function(req, res) {
    await Sentences.create({ sentence: req.param('sentence') });
    return res.redirect('/say');
  },

  avatar: async function (req, res) {
    return res.view('avatar');
  },

  uploadAvatar: async function (req, res) {
    req.file('avatar').upload(options, async (err, filesUploaded) => {
      if (err) {
        return res.serverError(err);
      }

      console.debug('Uploaded ' + filesUploaded.length + ' file(s)');

      if (filesUploaded.length > 0) {
        await Avatar.destroy({});
        await Avatar.create({ avatar: filesUploaded[0].extra.key });
      }

      return res.redirect('/say');
    });
  },
};

