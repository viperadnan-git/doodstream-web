import {
    DEFAULT_PER_PAGE,
    DEFAULT_REVALIDATE_INTERVAL,
    DOODSTREAM_API_KEY,
    DOODSTREAM_BASE_URL,
} from "./constants";

type DoodstreamProps = {
    baseUrl?: string;
    key?: string;
};

class Doodstream {
    baseUrl: string;
    key: string;
    upstream: string | undefined;

    constructor(
        { baseUrl, key }: DoodstreamProps = {
            baseUrl: undefined,
            key: undefined,
        }
    ) {
        baseUrl = baseUrl || DOODSTREAM_BASE_URL;
        key = key || DOODSTREAM_API_KEY;

        if (!baseUrl) throw new Error("Doodstream Base URL not set");
        if (!key) throw new Error("Doodstream Key not set");

        this.baseUrl = baseUrl;
        this.key = key;
    }

    serializeQueryParams(params: { [key: string]: string }) {
        return new URLSearchParams(params).toString();
    }

    async fetch(
        cmd: string,
        params: { [key: string]: string },
        revalidate?: number
    ) {
        params.key = this.key;
        const url = `${this.baseUrl}/api${cmd}?${this.serializeQueryParams(
            params
        )}`;
        const response = await fetch(url, {
            next: { revalidate: revalidate || DEFAULT_REVALIDATE_INTERVAL },
        });
        return await response.json();
    }

    async listFiles({
        page = 1,
        per_page = DEFAULT_PER_PAGE,
        fld_id = "",
    }: {
        page?: number;
        per_page?: number;
        fld_id?: string;
    }) {
        if (per_page && per_page > 200)
            throw new Error("per_page cannot be greater than 200");

        const data = await this.fetch(
            "/file/list",
            {
                page: page.toString(),
                per_page: per_page.toString(),
                fld_id: fld_id.toString(),
            },
            60
        );
        return data;
    }

    async getFile({ file_code }: { file_code: string }) {
        const data = await this.fetch("/file/info", { file_code });
        return data;
    }

    async search({ query }: { query: string }) {
        const data = await this.fetch(
            "/search/videos",
            { search_term: query },
            60
        );
        return data;
    }

    async listFolders({ fld_id = "" }: { fld_id?: string }) {
        const data = await this.fetch("/folder/list", {
            only_folders: "1",
            fld_id,
        });
        return data;
    }

    async getFolder({ fld_id }: { fld_id: string }) {
        const data = await this.listFolders({ fld_id: "" });
        const folder = data.result.folders.find(
            (f: any) => f.fld_id === fld_id
        );
        return {
            ...data,
            folder,
        };
    }

    async getUpstream() {
        if (this.upstream) return this.upstream;

        const data = await this.listFiles({ page: 1, per_page: 1 });
        const sampleFile = data.result.files[0];
        const url = new URL(sampleFile.download_url);
        this.upstream = url.hostname;

        setTimeout(() => {
            this.upstream = undefined;
        }, DEFAULT_REVALIDATE_INTERVAL * 1000);
        return url.hostname;
    }
}

const doodstream = new Doodstream();

export default doodstream;
