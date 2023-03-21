import React from "react";
import PublicCms from "../../Service/PublicCms";
import PrivateRouteCms from "../../Service/PrivateRouteCms";
import { BrowserRouter, Switch } from "react-router-dom";
import Cms from "../../pages/Admin/CMS/CMS";
import AdminUpdates from "../../pages/Admin/CMS/Updates";
import UpdatesContent from "../../pages/Admin/CMS/UpdatesContent";
import Linklist from "../../pages/Admin/CMS/Linklist";
import FaqList from "../../pages/Admin/CMS/FaqList";
import CmsLogin from "../../pages/Admin/cmslogin/Login";
import GroupImage from "../../pages/Admin/CMS/GroupImage";
import UploadLink from "../../pages/Admin/CMS/UploadLink";
import Enquiry from "../../pages/Admin/CMS/Enauiry/Enquiry";
import EmailList from "../../pages/Admin/CMS/Enauiry/EmailList";
import FlashMessage from "../../pages/Admin/CMS/FlashMessage";
import CmsContent from "../../pages/Admin/CMS/CmsContent";
import UploadLinkContent from "../../pages/Admin/CMS/UploadLInkContent";
import Editupdates from "../../pages/Admin/CMS/Editupdates";
import EditImage from "../../pages/Admin/CMS/EditImage";
import EditVideo from "../../pages/Admin/CMS/EditVideo";
import Groupvideo from "../../pages/Admin/CMS/Groupvideo";
import MediaContent from "../../pages/Admin/CMS/MediaContent";
import EditFaq from "../../pages/Admin/CMS/EditFaq";
import VideoMedia from "../../pages/Admin/CMS/VideoMedia";
import MediaText from "../../pages/Admin/CMS/MediaText";
import AddCmsContent from "../../pages/Admin/CMS/AddCmsContent";
import Links from "../../pages/Admin/CMS/Links";
import Faq from "../../pages/Admin/CMS/Faq";
import FlashContent from "../../pages/Admin/CMS/FlashContent";
import MediaTab from "../../pages/Admin/CMS/MediaTab";
import VideoContent from "../../pages/Admin/CMS/VideoContent";
import Mediatextshow from "../../pages/Admin/CMS/Mediatextshow";
import MediaGallery from "../../pages/Admin/CMS/MediaGallery";
const CmsRoute = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <PublicCms path="/cms/login" component={CmsLogin} />
          <PrivateRouteCms exact path="/cms/cms" component={Cms} />
          <PrivateRouteCms exact path="/cms/flash" component={FlashMessage} />
          <PrivateRouteCms exact path="/cms/articles" component={CmsContent} />
          <PrivateRouteCms exact path="/cms/updates" component={AdminUpdates} />
          <PrivateRouteCms
            exact
            path="/cms_articlesedit/:id"
            component={CmsContent}
          />
          <PrivateRouteCms
            path="/cms/updatecontent"
            component={UpdatesContent}
          />
          <PrivateRouteCms
            exact
            path="/cms_editupdates/:id"
            component={Editupdates}
          />
          <PrivateRouteCms exact path="/cms/links" component={Links} />
          <PrivateRouteCms exact path="/cms_linksedit/:id" component={Links} />
          <PrivateRouteCms exact path="/cms/linklist" component={Linklist} />
          <PrivateRouteCms exact path="/cms/faqlist" component={FaqList} />
          <PrivateRouteCms
            exact
            path="/cms/mediagallery"
            component={MediaGallery}
          />
          <PrivateRouteCms
            exact
            path="/cms/mediacontent"
            component={MediaContent}
          />
          <PrivateRouteCms
            exact
            path="/cms/flashcontent"
            component={FlashContent}
          />
          <PrivateRouteCms
            path="/cms_flashcontent/:id"
            component={FlashContent}
          />
          <PrivateRouteCms exact path="/cms_faqedit/:id" component={Faq} />
          <PrivateRouteCms exact path="/cms/faq" component={Faq} />
          <PrivateRouteCms exact path="/cms/mediatab" component={MediaTab} />
          <PrivateRouteCms
            exact
            path="/cms/videocontent"
            component={VideoContent}
          />
          <PrivateRouteCms
            exact
            path="/cms/mediatext"
            component={Mediatextshow}
          />
          <PrivateRouteCms
            exact
            path="/cms_mediatext/:id"
            component={Mediatextshow}
          />
          <PrivateRouteCms
            exact
            path="/cms/imagegallery"
            component={GroupImage}
          />
          <PrivateRouteCms
            exact
            path="/cms/videogallery"
            component={Groupvideo}
          />
          <PrivateRouteCms
            exact
            path="/cms_editimage/:id"
            component={EditImage}
          />
          <PrivateRouteCms
            exact
            path="/cms_editvideo/:id"
            component={EditVideo}
          />
          <PrivateRouteCms exact path="/cms_editfaq/:id" component={EditFaq} />
          <PrivateRouteCms exact path="/cms/videolist" component={VideoMedia} />
          <PrivateRouteCms
            exact
            path="/cms/addarticles"
            component={AddCmsContent}
          />
          <PrivateRouteCms
            exact
            path="/cms/contentlist"
            component={MediaText}
          />
          <PrivateRouteCms
            exaxt
            path="/cms/imagelist"
            component={MediaContent}
          />
          <PrivateRouteCms
            exaxt
            path="/cms/uploadlink"
            component={UploadLink}
          />
          <PrivateRouteCms
            exaxt
            path="/cms/uploadlinkcontent"
            component={UploadLinkContent}
          />
          <PrivateRouteCms exact path="/cms/enquiry" component={Enquiry} />
          <PrivateRouteCms
            exact
            path="/cms_editenquiry/:id"
            component={Enquiry}
          />
          <PrivateRouteCms exact path="/cms/emaillist" component={EmailList} />
        </Switch>
      </BrowserRouter>
    </>
  );
};
export default CmsRoute;
