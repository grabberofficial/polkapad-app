export const KYCIframe: React.FC<{ iframeUrl: string }> = ({ iframeUrl }) => {
  if (iframeUrl.length)
    return (
      <iframe
        title="shuftipro-iframe"
        id="shuftipro-iframe"
        name="shuftipro-iframe"
        allow="camera"
        src={iframeUrl}
        width="100%"
        height="100%"
        data-removable={true}
        sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox"
        style={{
          // position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          margin: '0',
          padding: '0',
          overflow: 'hidden',
          border: 'none',
          zIndex: 2147483647,
        }}
      />
    );
  return <></>;
};
