import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Listing from "../pages/listings/Listing";
import NewChat from "../components/newChat/NewChat";
import PrivateRoute from "./PrivateRoute";
import ProjectDetail from "../pages/projects/ProjectDetail";
import ListingChart from "../components/ListingChart";
import CourseDetail from "../pages/courses/CourseDetail";
import Agentarchive from "../components/agents/Agentarchive";
import Agentdetails from "../components/agents/Agentdetails";
import AddAgents from "../components/agents/AddAgents";
import RegisterCompany from "../components/RegisterCompany";
import EditAgents from "../components/agents/EditAgents";
import Blogs from "../pages/blogs/Blogs";
import BlogsDetail from "../pages/blogs/BlogsDetail";
import AddBlog from "../components/blog/AddBlog";
import EditBlog from "../components/blog/EditBlog";
import EditCourse from "../components/course/EditCourse";
import ViewAgentRequest from "../components/verificationRequests/agent-requests/ViewAgentRequest";
import VerifyAuctionRequests from "../components/verificationRequests/auction-requests/VerifyAuctionRequests";
import ViewAuctionRequest from "../components/verificationRequests/auction-requests/ViewAuctionRequest";
import AddAuction from "../components/auction/AddAuction";
import ForbiddenAccess from "../components/ForbiddenAccess";
import News from "../pages/news/News";
import AddNews from "../components/news/AddNews";
import EditNews from "../components/news/EditNews";
import ModuleDetail from "../components/course/ModuleDetail";
import Settings from "../components/settings/Settings";
import VerifyProjectRequests from "../components/verificationRequests/project-requests/VerifyProjectRequests";
import ViewProjectRequest from "../components/verificationRequests/project-requests/ViewProjectRequest";
import Users from "../pages/users/Users";
import Dashboard from "../components/dashboard";
import ListingDetail from "../pages/listings/ListingDetail";
import Tickets from "../pages/tickets/Tickets";
import TicketDetails from "../components/tickets/TicketDetails";
import EditUser from "../pages/users/EditUser";
import UserDetails from "../pages/users/UserDetails";
import AddUser from "../pages/users/AddUser";
import Projects from "../pages/projects/Projects";
import EditListing from "../pages/listings/EditListing";
import CreateProperty from "../pages/listings/CreateProperty";
import Agencies from "../pages/agencies/Agencies";
import AgencyDetails from "../pages/agencies/AgencyDetails";
import EditAgency from "../pages/agencies/EditAgency";
import Verification from "../pages/verifications/Verification";
import AddAgency from "../pages/agencies/AddAgency";
import AddProject from "../pages/projects/AddProject";
import EditProject from "../pages/projects/EditProject";
import Auctions from "../pages/auctions/Auctions";
import AuctionDetail from "../pages/auctions/AuctionDetail";
import EditAuction from "../pages/auctions/EditAuction";
import ZSpehereContainer from "../pages/zSphere/zSphereContainer";
import NewsDetails from "../pages/news/NewsDetail";
import Courses from "../pages/courses/Courses";
import AddCourse from "../pages/courses/AddCourse";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" component={Login} module="Login" exact />

      <Route path="/403" component={ForbiddenAccess} exact />
      <Route
        component={Dashboard}
        module="Listings"
        path="/dashboard"
        exact
      />
      <Route
        component={ListingChart}
        module="ListingChart"
        path="/listingchart"
        exact
      />

      <PrivateRoute
        component={Settings}
        module="Settings"
        path="/settings"
        exact
      />
      <PrivateRoute component={NewChat} module="Chat" path="/chat" exact />

      <PrivateRoute component={Users} module="Users" path="/users" exact />
      <PrivateRoute component={UserDetails} module="Users" path="/user/:id" exact />
      <PrivateRoute component={EditUser} module="Users" path="/edit-user/:id" exact />
      <PrivateRoute component={AddUser} module="Users" path="/add-user" exact />

      <PrivateRoute component={Listing} module="Listings" path="/listings" exact />
      <PrivateRoute component={ListingDetail} module="Listings" path="/listing/:id" exact />
      <PrivateRoute component={CreateProperty} module="Listings" path="/add-listing" exact />
      <PrivateRoute component={EditListing} module="Listings" path="/edit-listing/:id" exact />
      <PrivateRoute
        component={RegisterCompany}
        path="/register-company"
        exact
      />
      <PrivateRoute component={Projects} module="Projects" path="/projects" exact />
      <PrivateRoute component={AddProject} module="Projects" path="/add-project" exact />
      <PrivateRoute component={EditProject} module="Projects" path="/edit-project/:id" exact />
      <PrivateRoute component={ProjectDetail} module="Projects" path="/project/:id" exact />

      <PrivateRoute component={Courses} module="Courses" path="/courses" exact />
      <PrivateRoute
        component={CourseDetail}
        module="Courses"
        path="/courseDetail/:id"
        exact
      />
      <PrivateRoute
        component={EditCourse}
        module="Courses"
        path="/edit-course/:id"
        exact
      />
      <PrivateRoute
        component={ModuleDetail}
        module="Courses"
        path="/moduleDetail/:id"
        exact
      />
      <PrivateRoute
        component={AddCourse}
        module="Courses"
        path="/add-course/"
        exact
      />

      <PrivateRoute
        component={Agentarchive}
        module="Agents"
        path="/agents"
        exact
      />
      <PrivateRoute
        component={Agentdetails}
        module="Agents"
        path="/agent-detail/:id"
        exact
      />
      <PrivateRoute
        component={AddAgents}
        module="Agents"
        path="/add-agent"
        exact
      />
      <PrivateRoute
        component={EditAgents}
        module="Agents"
        path="/editAgent/:id"
        exact
      />

      <PrivateRoute component={Agencies} module="Agencies" path="/agencies" exact />
      <PrivateRoute component={AddAgency} module="Agencies" path="/add-agency" exact />
      <PrivateRoute component={EditAgency} module="Agencies" path="/edit-agency/:id" exact />
      <PrivateRoute component={AgencyDetails} module="Agencies" path="/agency/:id" exact />

      <PrivateRoute component={Blogs} module="Blogs" path="/blogs" exact />
      <PrivateRoute
        component={BlogsDetail}
        module="Blogs"
        path="/blog-detail/:id"
        exact
      />
      <PrivateRoute component={AddBlog} module="Blogs" path="/add-blog" exact />
      <PrivateRoute
        component={EditBlog}
        module="Blogs"
        path="/edit-blog/:id"
        exact
      />

      <PrivateRoute
        component={Auctions}
        module="Auctions"
        path="/auctions"
        exact
      />
      <PrivateRoute
        component={AddAuction}
        module="Auctions"
        path="/add-auction"
        exact
      />
      <PrivateRoute
        component={AuctionDetail}
        module="Auctions"
        path="/auction/:id"
        exact
      />
      <PrivateRoute
        component={EditAuction}
        module="Auctions"
        path="/edit-auction/:id"
        exact
      />


      <PrivateRoute component={News} module="News" path="/news" exact />
      <PrivateRoute component={AddNews} module="News" path="/add-news" exact />
      <PrivateRoute component={NewsDetails} module="News" path="/news/:id" exact />

      <PrivateRoute
        component={EditNews}
        module="News"
        path="/edit-news/:id"
        exact
      />

      <PrivateRoute
        component={Verification} path="/verify/:type" exact />
      <PrivateRoute
        component={ViewAgentRequest}
        path="/view-agent-request/:id"
        exact
      />

      <PrivateRoute
        component={VerifyAuctionRequests}
        path="/verify-auction-requests"
        exact
      />
      <PrivateRoute
        component={ViewAuctionRequest}
        path="/view-auction-request/:id"
        exact
      />

      <PrivateRoute
        component={VerifyProjectRequests}
        path="/verify-project-requests"
        exact
      />
      <PrivateRoute
        component={ViewProjectRequest}
        path="/view-project-request/:id"
        exact
      />

      <PrivateRoute component={Tickets} path="/tickets/" exact />
      <PrivateRoute component={TicketDetails} path="/ticket/:id" exact />

      <PrivateRoute component={ZSpehereContainer} path="/zSphere/" exact />

    </Switch>
  );
};
export default Routes;
