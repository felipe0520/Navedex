import { Naver } from "../model/Naver";
import { Project } from "../model/Projects";

export class BusinessRules {
  public validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
  }

  public validateFormatDate(date: string): boolean {
    return new Date(date).toString() === "Invalid Date";
  }

  public dateIsAfterToActual(date: string): boolean {
    return new Date(date) > new Date();
  }

  public naverDataBaseForScreen(users: Naver[]) {
    return users.map((el) => {
      return {
        id: el.getId(),
        name: el.getName(),
        birth_date: el.getBirthDate(),
        admission_date: el.getAdmissionDate(),
        job_role: el.getJobRole(),
      };
    });
  }

  public projectDataBaseForScreen(project: Project[]) {
    return project.map((el) => {
      return {
        id: el.getId(),
        name: el.getName(),
      };
    });
  }

  public naverDataBaseFromUserDetailScreen(naver: any) {
    const userAndProjects: NaverDetail = {
      id: naver[0].id_user,
      name: naver[0].name,
      birth_date: naver[0].birth_date,
      job_role: naver[0].job_role,
      admission_date: naver[0].admission_date,
      projects: naver.map((el: ProjectDetail) => {
        return { id: el.id_project, name: el.name_project };
      }),
    };

    return userAndProjects;
  }

  public projectDataBaseFromUserDetailScreen(project: any) {
    const projectData = project[0];
    const projectAndUsers: ProjectDetail = {
      id: projectData.id_project,
      name: projectData.name_project,

      users: project.map((el: NaverDetail) => {
        return {
          id: el.id_user,
          name: el.name,
          birth_date: el.birth_date,
          admission_date: el.admission_date,
          job_role: el.job_role,
        };
      }),
    };
    return projectAndUsers;
  }
}

interface NaverDetail {
  id: string;
  name: string;
  birth_date: string;
  job_role: string;
  admission_date: string;
  id_user?: string;
  projects?: ProjectDetail[];
}

interface ProjectDetail {
  id: string;
  name: string;
  name_project?: string;
  id_project?: string;
  users?: NaverDetail[];
}
