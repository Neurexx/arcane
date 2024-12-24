import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient();

class SchedulerService {
  async scheduleExam(examId) {
    try {
      // 1. Get exam details with registered students
      const exam = await prisma.exam.findUnique({
        where: { id: examId },
        include: {
          examRegistrations: {
            include: { student: true }
          }
        }
      });

      if (!exam) throw new Error('Exam not found');

      // 2. Get available rooms
      const rooms = await prisma.room.findMany({
        orderBy: { capacity: 'desc' }
      });

      // 3. Find suitable rooms for the exam
      const selectedRooms = this.findSuitableRooms(rooms, exam.totalStudents);
      if (selectedRooms.length === 0) {
        throw new Error('No suitable rooms available');
      }

      // 4. Create exam schedules for each room
      const schedules = await this.createExamSchedules(exam, selectedRooms);

      // 5. Assign seating arrangements
      const seatingArrangements = await this.assignSeats(exam, schedules);

      return {
        schedules,
        seatingArrangements
      };
    } catch (error) {
      throw error;
    }
  }

  findSuitableRooms(rooms, totalStudents) {
    let remainingStudents = totalStudents;
    const selectedRooms = [];

    for (const room of rooms) {
      if (remainingStudents <= 0) break;

      // Consider social distancing - use 50% of room capacity
      const effectiveCapacity = Math.floor(room.capacity * 0.5);
      selectedRooms.push(room);
      remainingStudents -= effectiveCapacity;
    }

    return remainingStudents <= 0 ? selectedRooms : [];
  }

  async createExamSchedules(exam, rooms) {
    const schedules = [];

    for (const room of rooms) {
      const schedule = await prisma.examSchedule.create({
        data: {
          examId: exam.id,
          roomId: room.id,
          startTime: exam.date,
          endTime: new Date(exam.date.getTime() + exam.duration * 60000),
          status: 'scheduled'
        },
        include: {
          room: true
        }
      });

      schedules.push(schedule);
    }

    return schedules;
  }

  async assignSeats(exam, schedules) {
    const seatingArrangements = [];
    let studentIndex = 0;
    const students = exam.examRegistrations.map(reg => reg.student);

    for (const schedule of schedules) {
      const roomCapacity = Math.floor(schedule.room.capacity * 0.5); // 50% capacity for distancing
      let currentSeat = 1;

      while (currentSeat <= roomCapacity && studentIndex < students.length) {
        const student = students[studentIndex];
        const seatNumber = `R${schedule.roomId}-S${currentSeat}`;

        const arrangement = await prisma.seatingArrangement.create({
          data: {
            scheduleId: schedule.id,
            studentId: student.id,
            seatNumber
          },
          include: {
            student: true
          }
        });

        seatingArrangements.push(arrangement);
        studentIndex++;
        currentSeat += 2; // Skip one seat for distancing
      }
    }

    return seatingArrangements;
  }

  async getExamSchedule(examId) {
    return prisma.examSchedule.findMany({
      where: { examId },
      include: {
        room: true,
        seatingArrangements: {
          include: {
            student: true
          }
        }
      }
    });
  }
}


export {SchedulerService}