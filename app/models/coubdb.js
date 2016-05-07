var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coubdb');

var Schema = mongoose.Schema;

var coubvideoSchema = new Schema ({
  video_orig: String,
  flag: Number,
  abuses: Number,
  recoubs_by_users_channels: Number,
  recoub: Number,
  like: Number,
  in_my_best2015: Boolean,
  type: String,
  permalink: String,
  title: String,
  visibility_type: String,
  original_visibility_type: String,
  channel_id: Number,
  created_at: Date,
  updated_at: Date,
  is_done: Boolean,
  views_count: Number,
  cotd: Number,
  cotd_at: Number,
  published_at: Date,
  views_increase_count: Number,
  shares_count: Number,
  reversed: Boolean,
  ipad_playback_reversed: Boolean,
  from_editor_v2: Boolean,
  is_editable: Boolean,
  original_sound: Boolean,
  has_sound: Boolean,
  recoub_to: Number,
  file_versions:{
    web:{
      template: String,
      types:[],
      versions:[]
    },
    web_chunks:{
      template: String,
      types:[],
      versions:[],
      chunks:[]
    },
    html5:{
      video:{
        high:{
          url: String,
          size: Number
        },
        med:{
          url: String,
          size: Number
        }
      },
      audio:{
        high:{
          url: String,
          size: Number
        },
        med:{
          url: String,
          size: Number
        },
        sample_duration: Number
      }
    },
    iphone:{
      url: String
    },
    mobile:{
      audio_url: String,
      base64_url: String,
      base64_files:[],
      base64_files_small:[],
      frames_count: Number
    }
  },
  audio_versions:{
  },
  flv_audio_versions:{
  },
  image_versions:{
    template: String,
    versions:[]
  },
  first_frame_versions:{
    template: String,
    versions:[]
  },
  dimensions:{
    big:[],
    med:[],
    small:[]
  },
  site_w_h:[],
  page_w_h:[],
  site_w_h_small:[],
  age_restricted: Boolean,
  age_restricted_by_admin: Boolean,
  not_safe_for_work: Boolean,
  allow_reuse: Boolean,
  dont_crop: Boolean,
  banned: Boolean,
  global_safe: Boolean,
  comments_count: Number,
  audio_file_url: Number,
  external_download: Boolean,
  application: Number,
  channel:{
    id: Number,
    permalink: Number,
    title: Number,
    description: Number,
    followers_count: Number,
    following_count: Number,
    avatar_versions:{
      template: String,
      versions:[]
    }
  },
  file: String,
  picture: String,
  timeline_picture: String,
  small_picture: String,
  sharing_picture: Number,
  percent_done: Number,
  tags:[
    {
      id: Number,
      title: String,
      value: String
    },
    {
      id: Number,
      title: String,
      value: String
    },
    {
      id: Number,
      title: String,
      value: String
    },
    {
      id: Number,
      title: String,
      value: String
    }
  ],
  recoubs_count: Number,
  likes_count: Number,
  raw_video_id: Number,
  uploaded_by_ios_app: Boolean,
  uploaded_by_android_app: Boolean,
  media_blocks:{},
  raw_video_thumbnail_url: String,
  raw_video_title: String,
  video_block_banned: Boolean,
  duration: Number,
  promo_winner: Boolean,
  promo_winner_recoubers: Number,
  editorial_info:{},
  tracking_pixel_url: Number,
  promo_hint: Number,
  beeline_best_2014: Number,
  from_web_editor: Boolean,
  normalize_sound: Boolean,
  loops_count: Number,
  total_views_duration: Number,
  best2015_addable: Boolean,
  ahmad_promo: Number,
  position_on_page: Number
});

var CoubVideo = mongoose.model('CoubVideo', coubvideoSchema);

module.exports = CoubVideo;
