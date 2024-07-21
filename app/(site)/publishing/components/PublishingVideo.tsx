export default function PublishingVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      controls={false}
      autoPlay
      playsInline
      muted
      loop
    >
      <source src={`/publishing-video.webm`} type="video/webm" />
      <source src={`/publishing-video.mp4`} type="video/mp4" />
    </video>
  );
}
