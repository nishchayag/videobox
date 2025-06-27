import mongoose from "mongoose";

export interface VideoInterface {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
}

export const VIDEO_DIMENTIONS = {
  height: 1920,
  width: 1080,
} as const;

const videoSchema = new mongoose.Schema<VideoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENTIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENTIONS.height,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  { timestamps: true }
);

const Video = mongoose.model<VideoInterface>("Video", videoSchema);

export default mongoose.models.Video || Video;
