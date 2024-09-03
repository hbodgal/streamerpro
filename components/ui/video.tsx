export default function VideoComponent({url}: {url: string}) {
    
    return (
        <iframe
        width={560}
        height={315}
        allowFullScreen
        src={url}
        className="pointer-events-none"
      />
    )
  }