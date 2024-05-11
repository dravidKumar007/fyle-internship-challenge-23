import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repository } from '../Repository';
import { GitHubUser } from '../GitHubUser';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit  {
[x: string]: any;
  
  constructor(private route: ActivatedRoute,private apiService:ApiService) { }
   repository: Repository[] =[ {
    id: 0,
    node_id: "",
    name: "",
    full_name: "",
    private: false,
    owner: {
        login: "",
        id: 0,
        node_id: "",
        avatar_url: "",
        gravatar_id: "",
        url: "",
        html_url: "",
        followers_url: "",
        following_url: "",
        gists_url: "",
        starred_url: "",
        subscriptions_url: "",
        organizations_url: "",
        repos_url: "",
        events_url: "",
        received_events_url: "",
        type: "",
        site_admin: false
    },
    html_url: "",
    description: null,
    fork: false,
    url: "",
    forks_url: "",
    keys_url: "",
    collaborators_url: "",
    teams_url: "",
    hooks_url: "",
    issue_events_url: "",
    events_url: "",
    assignees_url: "",
    branches_url: "",
    tags_url: "",
    blobs_url: "",
    git_tags_url: "",
    git_refs_url: "",
    trees_url: "",
    statuses_url: "",
    languages_url: "",
    stargazers_url: "",
    contributors_url: "",
    subscribers_url: "",
    subscription_url: "",
    commits_url: "",
    git_commits_url: "",
    comments_url: "",
    issue_comment_url: "",
    contents_url: "",
    compare_url: "",
    merges_url: "",
    archive_url: "",
    downloads_url: "",
    issues_url: "",
    pulls_url: "",
    milestones_url: "",
    notifications_url: "",
    labels_url: "",
    releases_url: "",
    deployments_url: "",
    created_at: "",
    updated_at: "",
    pushed_at: "",
    git_url: "",
    ssh_url: "",
    clone_url: "",
    svn_url: "",
    homepage: null,
    size: 0,
    stargazers_count: 0,
    watchers_count: 0,
    language: null,
    has_issues: false,
    has_projects: false,
    has_downloads: false,
    has_wiki: false,
    has_pages: false,
    has_discussions: false,
    forks_count: 0,
    mirror_url: null,
    archived: false,
    disabled: false,
    open_issues_count: 0,
    license: null,
    allow_forking: false,
    is_template: false,
    web_commit_signoff_required: false,
    topics: [],
    visibility: "",
    forks: 0,
    open_issues: 0,
    watchers: 0,
    default_branch: ""
}];
user: GitHubUser = {
  login: "",
  id: 0,
  node_id: "",
  avatar_url: "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg",
  gravatar_id: "",
  url: "",
  html_url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  subscriptions_url: "",
  organizations_url: "",
  repos_url: "",
  events_url: "",
  received_events_url: "",
  type: "",
  site_admin: false,
  name: "",
  company: null,
  blog: "",
  location: null,
  email: null,
  hireable: null,
  bio: "",
  twitter_username: null,
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: "",
  updated_at: ""
};
  name:string|null=""
  page:number=1
  perpage:number=10
  total_pages:number=0
  redirect(url:string|undefined){
    if(url)
    window.location.href = url;
     
  }
  getpageindex(): number[] {
    if(this.user.public_repos){
      var num=Math.ceil(this.user.public_repos / this.perpage)
      if(num>7){
        return Array.from({ length: 7}, (_, index) => index + 1);
      }
    return Array.from({ length: num }, (_, index) => index + 1);}
    return [];
  }
  currentIndex(){
    if(this.user.public_repos){
      var num=Math.ceil(this.user.public_repos / this.perpage)
      if(this.page>=num-2){
      return [num-4,num-3,num-2,num-1,num]
      }else{
        return [this.page-2,this.page-1,this.page,this.page+1,this.page+2]
      }
    }
    return []
  }
  next(){
    if (this.name) {
      this.apiService.getRepos(this.name, this.page+1, this.perpage).subscribe((repo: Repository[]) => {
      this.page+=1
      this.repository = repo;
  });
}
  }
  prev(){
    if (this.name) {
      this.apiService.getRepos(this.name, this.page-1, this.perpage).subscribe((repo: Repository[]) => {
      this.page-=1
      this.repository = repo;
  });
  
}
  }

  gotopg(num:number){
    if (this.name) {
      this.apiService.getRepos(this.name, num, this.perpage).subscribe((repo: Repository[]) => {
      this.page=num
      this.repository = repo;
  });
}}
change(){
  if (this.name) {
      this.apiService.getRepos(this.name, this.page, this.perpage).subscribe((repo: Repository[]) => {
        this.repository = repo;
      });
}
}
  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    if (this.name) {
      this.apiService.getRepos(this.name, this.page, this.perpage).subscribe((repo: Repository[]) => {
        this.repository = repo;
       
      });
      this.apiService.getUser(this.name).subscribe((user: GitHubUser) => {
        this.user = user;
        console.log(user)
         if(this.user.public_repos)
        this.total_pages = Math.ceil(this.user.public_repos / this.perpage)
      });
     
  }

}
}
