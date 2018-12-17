import { IHttpService, ISDKInfo } from 'kentico-cloud-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IContentManagementClientConfig } from '../config/icontent-management-client-config.interface';
import { AssetContracts, ContentItemContracts } from '../contracts';
import { assetsResponseMapper, contentItemsResponseMapper } from '../mappers';
import { ContentItemElements, ContentItemModels, IContentManagementQueryConfig, AssetModels } from '../models';
import { AssetResponses, ContentItemResponses } from '../responses';
import { BaseContentManagementQueryService } from './base-content-management-service.class';

export class ContentManagementQueryService extends BaseContentManagementQueryService {

    constructor(
        protected config: IContentManagementClientConfig,
        protected httpService: IHttpService,
        protected sdkInfo: ISDKInfo
    ) {
        super(config, httpService, sdkInfo);
    }

    addAsset(
        url: string,
        data: AssetModels.IAddAssetRequestData,
        config: IContentManagementQueryConfig
    ): Observable<AssetResponses.AddAssetResponse> {
        return this.postResponse<AssetContracts.IAddAssetResponseContract>(
            url,
            data,
            config,
        ).pipe(
            map(response => {
                return assetsResponseMapper.mapAddAssetResponse(response);
            })
        );
    }

    uploadBinaryFile(
        url: string,
        data: AssetModels.IUploadBinaryFileRequestData,
        config: IContentManagementQueryConfig
    ): Observable<AssetResponses.UploadBinaryFileResponse> {
        return this.postResponse<AssetContracts.IUploadBinaryFileResponseContract>(
            url,
            data.binaryData,
            config,
            [
                { header: 'Content-type', value: data.contentType },
                { header: 'Content-length', value: data.contentLength.toString() }
            ]
        ).pipe(
            map(response => {
                return assetsResponseMapper.mapUploadBinaryFileResponse(response);
            })
        );
    }

    viewAsset(
        url: string,
        config: IContentManagementQueryConfig
    ): Observable<AssetResponses.ViewAssetResponse> {
        return this.getResponse<AssetContracts.IAssetModelContract>(
            url,
            config
        ).pipe(
            map(response => {
                return assetsResponseMapper.mapViewAssetResponse(response);
            })
        );
    }

    listAssets(
        url: string,
        config?: IContentManagementQueryConfig
    ): Observable<AssetResponses.AssetsListResponse> {
        return this.getResponse<AssetContracts.IAssetsListingResponseContract>(
            url,
            config
        ).pipe(
            map(response => {
                return assetsResponseMapper.mapListingAssetsResponse(response);
            })
        );
    }

    listContentItems(
        url: string,
        config?: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.ContentItemsResponse> {
        return this.getResponse<ContentItemContracts.IContentItemsListingResponseContract>(
            url,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapListingItemsResponse(response);
            })
        );
    }

    viewContentItem(
        url: string,
        config?: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.ViewContentItemResponse> {
        return this.getResponse<ContentItemContracts.IViewContentItemResponseContract>(
            url,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapViewContentItemResponse(response);
            })
        );
    }

    addContentItem(
        url: string,
        data: ContentItemContracts.IAddContentItemPostContract,
        config: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.AddContentItemResponse> {
        return this.postResponse<ContentItemContracts.IAddContentItemResponseContract>(
            url,
            data,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapAddContentItemResponse(response);
            })
        );
    }

    updateContentItem(
        url: string,
        data: ContentItemContracts.IUpdateContentItemPostContract,
        config: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.AddContentItemResponse> {
        return this.putResponse<ContentItemContracts.IUpdateContentItemResponseContract>(
            url,
            data,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapUpdateContentItemResponse(response);
            })
        );
    }

    deleteContentItem(
        url: string,
        config: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.DeleteContentItemResponse> {
        return this.deleteResponse<ContentItemContracts.IDeleteContentItemResponseContract>(
            url,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapDeleteContentItemResponse(response);
            })
        );
    }

    listLanguageVariants<TElements extends ContentItemModels.ContentItemVariantElements>(
        url: string,
        fieldDefinitions: ContentItemElements.IContentItemElementDefinition[],
        createElements: () => TElements,
        config: IContentManagementQueryConfig
    ): Observable<ContentItemResponses.ListLanguageVariantsResponse<TElements>> {
        return this.getResponse<ContentItemContracts.IListLanguageVariantsResponseContract[]>(
            url,
            config
        ).pipe(
            map(response => {
                return contentItemsResponseMapper.mapLanguageVariantsResponse<TElements>(response, fieldDefinitions, createElements);
            })
        );
    }
}
