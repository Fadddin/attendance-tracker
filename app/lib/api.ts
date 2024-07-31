import axios from "axios";


interface Subject {
    name: string;
    attended: number;
    total: number;
}

interface UserData {
    name: string;
    user: string;
    subjects: Subject[];
}

export const fetchUserData = async (Id: string): Promise<UserData> => {
    try {
        const response = await axios.get<UserData>(`/api/user/${Id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};