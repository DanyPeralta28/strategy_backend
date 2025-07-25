declare module 'localtunnel' {
  interface Tunnel {
    url: string;
    close: () => void;
    on: (event: string, callback: () => void) => void;
  }

  interface LocalTunnelOptions {
    port: number;
    subdomain?: string;
    host?: string;
  }

  function localtunnel(opts: LocalTunnelOptions): Promise<Tunnel>;

  export = localtunnel;
}