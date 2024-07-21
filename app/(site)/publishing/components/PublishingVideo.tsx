export default function PublishingVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src="/publishing-video.mp4"
      controls={false}
      autoPlay
      playsInline
      muted
      loop
    />
  );
}
