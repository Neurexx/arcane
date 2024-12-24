import SchedulerService from '../services/scheduler.service'

export class SchedulerController {
  constructor() {
    this.schedulerService = new SchedulerService();
  }

  async scheduleExam(req, res) {
    try {
      const { examId } = req.params;
      const schedule = await this.schedulerService.scheduleExam(examId);
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchedule(req, res) {
    try {
      const { examId } = req.params;
      const schedule = await this.schedulerService.getExamSchedule(examId);
      res.json(schedule);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}